from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
from django.template.context_processors import request
import json
# Create your views here.

def index(request):
    context = {"post":"si"}
    return render(request, 'index.html', context)

def crearRuta(request):
    infomacion = request.POST['info']
    dato = json.loads(infomacion)
    vv = dato['rutaIda']
    
    return HttpResponse("ruta guardada")

def verMapa(request):
    return render(request,'formulario/mapa.html')

def verTabla(request):
    return render(request,'formulario/tabla.html')