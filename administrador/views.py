from django.shortcuts import render, get_object_or_404
from formulario.models import Cotizacion, Punto
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
import json
from administrador.models import formulario
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from propuesta.models import Confirmacion


BASE_DIR = '127.0.0.1:8000'
BASE_DIR_PROPUESTA = BASE_DIR+"/propuesta/"

# Create your views here.

def administrador(request):
    return render(request,'administrador/principal.html')

def jsonServidor(request):
    cotizaciones = Cotizacion.objects.filter(respondido = False).order_by('-fecha').values()
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

def crearPropuesta(request):
    qdic = request.POST
    dic = dict(qdic.iterlists())
    cotizacion = Cotizacion.objects.get(pk=dic.get('id')[0])
    cotizacion.respondido = True
    cotizacion.save()
    form = formulario()
    form.precioIda = dic.get('cm1')[0]
    if dic.get('cm2')[0]!='':
        form.precioRegreso = dic.get('cm2')[0]
    form.comentarios = dic.get('cm3')[0]
    form.cotizacion = cotizacion
    form.slug = get_random_string(length=5)
    form.save()
    form.slug = form.slug+str(form.pk)
    form.save()
    send_mail('Propuesta sival', 'Hola '+cotizacion.nombre+'. Ingrese a la pagina '+ BASE_DIR_PROPUESTA+form.slug+ ' para ver tu propuesta', 'from@example.com',
    [cotizacion.correo], fail_silently=False)
    return HttpResponse('ok')

def darPropuesta(request,slug):
    propuesta = get_object_or_404(formulario,slug = slug)
    context = {'cm1':propuesta.precioIda,'cm2':propuesta.precioRegreso,'cm3':propuesta.comentarios}
    return render(request,'administrador/propuesta.html',context)

def HistorialSolicitud(request):
    return render(request,'administrador/solicitudes.html')

def HistorialPropuestas(request):
    return render(request,'administrador/propuesta.html')

def jsonSolicitudes(request):
    cotizaciones = Cotizacion.objects.all().values()
    lista = []
    for cot in cotizaciones:
        punto1 = Punto.objects.filter(cotizacion_id = cot.get('id')).filter(camino='OR').filter(secuencia=0)[0]
        punto2 = Punto.objects.filter(cotizacion_id = cot.get('id')).filter(camino='DS').filter(secuencia=0)[0]
        cot['origen'] = punto1.nombre
        cot['destino'] = punto2.nombre
        try:
            formu = formulario.objects.get(cotizacion_id = cot.get('id'))
            cot['pida'] = formu.precioIda
            cot['pregreso'] = formu.precioRegreso
            cot['com'] = formu.comentarios
            cot['vista'] = formu.vista
            lista.append(cot) 
        except formulario.DoesNotExist:
            cot['pida'] = 0
            cot['pregreso'] = 0
            cot['com'] = ''
            lista.append(cot) 
    dic = {"aaData":lista}
    serial2 = json.dumps(dic, cls=DjangoJSONEncoder)
    return HttpResponse(serial2)
    
def jsonPropuestas(request):
    confirmaciones = Confirmacion.objects.all().values()
#     serial = json.dumps(list(confirmaciones), cls=DjangoJSONEncoder)
    dic = {"aaData":list(confirmaciones)}
    serial2 = json.dumps(dic, cls=DjangoJSONEncoder)
    return HttpResponse(serial2)
    
    
    