from django.shortcuts import render
from formulario.models import Cotizacion, Punto
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
import json



# Create your views here.

def administrador(request):
    return render(request,'administrador/index.html')

def jsonServidor(request):
    cotizaciones = Cotizacion.objects.all().order_by('-fecha').values()
    lista = []
    for cot in cotizaciones:
        punto1 = Punto.objects.filter(cotizacion_id = cot.get('id')).filter(camino='OR').filter(secuencia=0)[0]
        punto2 = Punto.objects.filter(cotizacion_id = cot.get('id')).filter(camino='DS').filter(secuencia=0)[0]
        cot['origen'] = punto1.nombre
        cot['destino'] = punto2.nombre
        lista.append(cot)        
    dic = {"aaData":lista}
    serial2 = json.dumps(dic, cls=DjangoJSONEncoder)
    return HttpResponse(serial2)

def rutaIda(request, id):
    cotizacion = Cotizacion.objects.get(pk=id);
    puntosIda = Punto.objects.filter(cotizacion = cotizacion).filter(camino='OR').order_by('secuencia').values();
    serial = json.dumps(list(puntosIda), cls=DjangoJSONEncoder)
    return HttpResponse(serial)

def rutaVuelta(request, id):
    cotizacion = Cotizacion.objects.get(pk=id);
    puntosIda = Punto.objects.filter(cotizacion = cotizacion).filter(camino='DS').order_by('secuencia').values();
    serial = json.dumps(list(puntosIda), cls=DjangoJSONEncoder)
    return HttpResponse(serial)
    
    