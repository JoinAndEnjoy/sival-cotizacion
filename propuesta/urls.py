'''
Created on 8/01/2016

@author: jose
'''
from django.conf.urls import url
import views

urlpatterns = [
    url(r'^infomracion/$', views.datosCotizador, name='info'),
    url(r'^pdf/$', views.pdf, name='pdf'),
    url(r'^ver/(?P<slug>[^\.]+)/$', views.ver, name='ver'),
    url(r'^(?P<slug>[^\.]+)/$', views.propuesta, name='propuesta'),
]