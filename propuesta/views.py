from django.shortcuts import render,get_object_or_404
from administrador.models import formulario
from formulario.models import Cotizacion
from django.http import HttpResponse
from django.core.serializers.json import DjangoJSONEncoder
import json
from Cotizador import settings
from django.core import serializers
from propuesta.models import Confirmacion
# Create your views here.

def propuesta(request,slug):
    propuesta = get_object_or_404(formulario,slug = slug)
    '''cotizacion = get_object_or_404(Cotizacion,pk = propuesta.cotizacion_id)
    context = {'propuesta':propuesta,'cotizacion':cotizacion}'''
    context = {'propuesta':propuesta}
    return render(request,'propuesta/index.html',context)

def ver(request,slug):
    propuesta = get_object_or_404(formulario,slug = slug)
    propuesta.vista = True
    propuesta.save()
    cotizacion = get_object_or_404(Cotizacion,pk = propuesta.cotizacion_id)
    serial = serializers.serialize('json', [ cotizacion, ])
    context = {'propuesta':propuesta,'cotizacion':cotizacion,'serial':serial}    
    return render(request,'propuesta/propuesta.html',context)

def datosCotizador(request):
    cotizacion = get_object_or_404(Cotizacion,pk = request.POST['idcot'])
    confirmacion = Confirmacion()
    confirmacion.puestos = request.POST['puestos']
    confirmacion.cedula = request.POST['identificacion']
    confirmacion.telefono = request.POST['telefono']
    confirmacion.tipo = request.POST['tipo']
    confirmacion.cotizacion = cotizacion
    confirmacion.save()
    
    con = get_object_or_404(Confirmacion,pk = confirmacion.pk)
    return HttpResponse('ok')
    
def pdf(request):
    with open(settings.BASE_DIR+'/propuesta/static/contrato.pdf', 'rb') as pdf:
        response = HttpResponse(pdf.read(),content_type='application/pdf')
        response['Content-Disposition'] = 'filename=contrato.pdf'
        return response
    pdf.closed