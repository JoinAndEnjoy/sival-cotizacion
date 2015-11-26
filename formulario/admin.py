from django.contrib import admin
from .models import Ruta
# Register your models here.

class RutaAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Origen',               {'fields': ['origen']}),
        ('Destino',               {'fields': ['destino']}),
    ]
    list_display = ('origen', 'destino')
    search_fields = ['origen']
    search_fields = ['destino']

admin.site.register(Ruta, RutaAdmin)
