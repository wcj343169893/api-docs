export async function onRequest({ request, next, env }) {
  const authorization = request.headers.get('Authorization');

  if (authorization) {
    const [, encoded] = authorization.split(' ');
    const [user, password] = atob(encoded).split(':');

    if (user === env.AUTH_USER && password === env.AUTH_PASS) {
      return next(); // 驗證通過
    }
  }

  // 未登入或密碼錯誤，彈出 Basic Auth 彈窗
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="登入"',
    },
  });
}