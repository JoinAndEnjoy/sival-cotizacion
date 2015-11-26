from django.shortcuts import render
from .models import Ruta
from django.http import HttpResponse
from django.template import RequestContext
# Create your views here.

def index(request):
    context = {"ho":"ho"}
    return render(request, 'index.html', context)

def crearRuta(request):
    rutan = Ruta(origen=request.POST['origen'], destino=request.POST['destino'])
    rutan.save()
    return HttpResponse("ruta guardada")