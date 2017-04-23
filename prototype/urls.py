#why rest frame work nested instead of
from rest_framework_nested import routers
from authentication.views import AccountViewSet
from django.conf.urls import url, include
from prototype.views import IndexView




router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet )

urlpatterns = [

#pass api through routers
url(r'^api/v1/',include(router.urls)),

#last url to catch anything else
url(r'^', IndexView.as_view(), name='index'),
]
