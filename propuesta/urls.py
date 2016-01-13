'''
Created on 8/01/2016

@author: jose
'''
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^ver/(?P<slug>[^\.]+)$', views.ver, name='ver'),
    url(r'^(?P<slug>[^\.]+)/$', views.propuesta, name='propuesta'),
]