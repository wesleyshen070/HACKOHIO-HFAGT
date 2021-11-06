from django.contrib import admin
from django.urls import path
from . import views
from .views import upload_file_view

app_name = 'datavisulize'

urlpatterns = [
    path('', upload_file_view, name='upload-view'),
]