from django.db import models
from formulario.models import Cotizacion

# Create your models here.

class Confirmacion(models.Model):
    fecha = models.DateField(auto_now_add=True)
    puestos = models.CharField(max_length=200)
    cedula = models.CharField(max_length=200)
    telefono = models.CharField(max_length=200)
    tipo = models.CharField(max_length=200)
    cotizacion= models.ForeignKey(Cotizacion,on_delete=models.CASCADE)
    