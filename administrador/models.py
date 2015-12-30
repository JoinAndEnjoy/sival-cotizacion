from __future__ import unicode_literals

from django.db import models
from formulario.models import Cotizacion 



# Create your models here.

class formulario(models.Model):
    precioIda = models.IntegerField()
    precioRegreso = models.IntegerField()
    comentarios = models.CharField(max_length=200)
    cotizacion= models.ForeignKey(Cotizacion,on_delete=models.CASCADE)
    slug = models.SlugField(max_length = 100, unique = True)
        
    
    
