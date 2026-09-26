import { HttpInterceptorFn } from '@angular/common/http';

function getCookie(name: string): string | null {
  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const trimmed = cookie.trim();

    if (trimmed.startsWith(`${name}=`)) {
      return decodeURIComponent(
        trimmed.substring(name.length + 1)
      );
    }
  }

  return null;
}

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const csrfToken = getCookie('csrftoken');

  let csrfRequest = req.clone({
    withCredentials: true
  });

  if (csrfToken) {
    csrfRequest = csrfRequest.clone({
      setHeaders: {
        'X-CSRFToken': csrfToken
      }
    });
  }

  return next(csrfRequest);
};