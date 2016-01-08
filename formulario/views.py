from django.shortcuts import render
from django.http import HttpResponse
from django.core.serializers.json import DjangoJSONEncoder
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
    cot.camino = dicconario.get('ruta')
    date = datetime.datetime.strptime(dicconario.get('salida'), "%m/%d/%Y %I:%M %p").strftime('%Y-%m-%d %H:%M')
    cot.salida = date
    cot.distancia = dicconario.get('distancia')
    cot.distancia2 = dicconario.get('distancia2')
    if dicconario.get('regreso')!= "":
        cot.regreso = datetime.datetime.strptime(dicconario.get('regreso'), "%m/%d/%Y %I:%M %p").strftime('%Y-%m-%d %H:%M')
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

def verMapa2(request,id,caminon):
    cotizacion = Cotizacion.objects.get(pk=id);
    if caminon=='1':
        puntos = Punto.objects.filter(cotizacion = cotizacion).filter(camino='OR').order_by('secuencia').values();
    else:
        puntos = Punto.objects.filter(cotizacion = cotizacion).filter(camino='DS').order_by('secuencia').values();
    
    serial = json.dumps(list(puntos), cls=DjangoJSONEncoder)
    context = {'ruta1' : serial}
    return render(request,'formulario/mapaVer.html',context)

def verTabla(request):
    return render(request,'formulario/tabla.html')

