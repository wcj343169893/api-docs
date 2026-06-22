export default {
  async fetch(request, env) {
    const authorization = request.headers.get('Authorization');

    if (authorization) {
      const [, encoded] = authorization.split(' ');
      const [user, password] = atob(encoded).split(':');

      if (user === env.AUTH_USER && password === env.AUTH_PASS) {
        return env.ASSETS.fetch(request);
      }
    }

    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="登入"',
      },
    });
  }
};