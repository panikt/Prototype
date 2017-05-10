#why rest frame work nested instead of
from rest_framework_nested import routers
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url, include

from authentication.views import AccountViewSet, LogoutView
from posts.views import PostViewSet,AccountPostsViewSet
from prototype.views import IndexView, LoginView
from images.views import GalleryViewSet

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet )
router.register(r'posts', PostViewSet )
router.register(r'images', GalleryViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
accounts_router.register(r'posts', AccountPostsViewSet)

urlpatterns = static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [

url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

#pass api through routers
url(r'^api/v1/', include(router.urls)),
url(r'^api/v1/', include(accounts_router.urls)),
#last url to catch anything else
url(r'^', IndexView.as_view(), name='index'),
]
