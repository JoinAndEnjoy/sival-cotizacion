from django.shortcuts import render
from django.http import HttpResponse
from .models import *
import json
import datetime

# Create your views here.

def index(request):
    context = {"post":"si"}
    return render(request, 'index.html', context)

def crearRuta(request):
    infomacion = request.POST['info']
    dicconario = json.loads(infomacion)
    cot = Cotizacion()
    cot.nombre = dicconario.get('nombre')
    cot.correo = dicconario.get('correo')
    cot.comentarios = dicconario.get('comentarios')
    cot.salida =datetime.datetime.strptime(dicconario.get('salida'), "%d/%m/%Y").strftime('%Y-%m-%d')
    if dicconario.get('regreso')!= "":
        cot.regreso = datetime.datetime.strptime(dicconario.get('regreso'), "%d/%m/%Y").strftime('%Y-%m-%d')
    cot.save()
    ruta1 = json.loads(dicconario.get('rutaIda'))
    for i, value in enumerate(ruta1):
        punto = Punto()
        punto.secuencia = i
        punto.camino = 'OR'
        punto.lat = value.get('posicion').get('lat')
        punto.lng = value.get('posicion').get('lng')
        punto.cotizacion = cot
        punto.nombre = value.get('nombre')
        punto.save()
    
    ruta2 = json.loads(dicconario.get('rutaVenida'))
    for i, value in enumerate(ruta2):
        punto = Punto()
        punto.secuencia = i
        punto.camino = 'DS'
        punto.lat = value.get('posicion').get('lat')
        punto.lng = value.get('posicion').get('lng')
        punto.cotizacion = cot
        punto.nombre = value.get('nombre')
        punto.save()
    return HttpResponse("ruta guardada")

def verMapa(request):
    return render(request,'formulario/mapa.html')

def verTabla(request):
    return render(request,'formulario/tabla.html')