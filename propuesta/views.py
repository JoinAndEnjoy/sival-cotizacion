from django.shortcuts import render,get_object_or_404
from administrador.models import formulario
from formulario.models import Cotizacion
from django.http import HttpResponse
from django.core.serializers.json import DjangoJSONEncoder
import json
from django.core import serializers
# Create your views here.

def propuesta(request,slug):
    propuesta = get_object_or_404(formulario,slug = slug)
    '''cotizacion = get_object_or_404(Cotizacion,pk = propuesta.cotizacion_id)
    context = {'propuesta':propuesta,'cotizacion':cotizacion}'''
    context = {'propuesta':propuesta}
    return render(request,'propuesta/index.html',context)

def ver(request,slug):
    propuesta = get_object_or_404(formulario,slug = slug)
    cotizacion = get_object_or_404(Cotizacion,pk = propuesta.cotizacion_id)
    serial = serializers.serialize('json', [ cotizacion, ])
    context = {'propuesta':propuesta,'cotizacion':cotizacion,'serial':serial}    
    return render(request,'propuesta/propuesta.html',context)