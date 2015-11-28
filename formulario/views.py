from django.shortcuts import render
from .models import Ruta
from django.http import HttpResponse
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def index(request):
    context = {"post":"si"}
    return render(request, 'index.html', context)

@csrf_exempt
def crearRuta(request):
    rutan = Ruta(origen=request.POST['dato1'], destino=request.POST['dato2'])
    rutan.save()
    return HttpResponse("ruta guardada")