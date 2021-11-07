from django.shortcuts import render
from django.views.generic import View
from .forms import CsvModelForm
from .models import Csv
import pandas as pd
import csv
import os
from . import main

from django.http import HttpResponse

# Create your views here.

def upload_file_view(request):
    form = CsvModelForm(request.POST or None, request.FILES or None)
    if form.is_valid():
        form.save()
        form = CsvModelForm()
        obj = Csv.objects.get(activated=False)
        with open(obj.file_name.path, 'r') as f:
            reader = csv.reader(f)
            obj.activated = True
            obj.save()
            main.seperating_file(obj.file_name.path, 'Cholecap')
            main.sum_frame_by_column('TRx_Total',
                    ['TRx_Month_1',
                     'TRx_Month_2',
                     'TRx_Month_3',
                     'TRx_Month_4',
                     'TRx_Month_5',
                     'TRx_Month_6'],
                    'Cholecap')
            main.total('Cholecap')
            main.deleting_first_columns('Cholecap')
            main.delete('Cholecap')
    return render(request, 'datavisulize/index.html', {'form': form})
