from django.shortcuts import render
from django.views.generic import View
from .forms import CsvModelForm
from .models import Csv
import csv
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

            for i, row in enumerate(reader):
                if i == 0:
                    pass
                else:
                    row = "".join(row)
                    row = row.replace(";", " ")
                    row = row.split()
                    print(row)
                    print(type(row))
            obj.activated = True
            obj.save()
    return render(request, 'datavisulize/index.html', {'form': form})
