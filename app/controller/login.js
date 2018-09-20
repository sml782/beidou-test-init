import { Decrypt } from '../utils/crypto';

module.exports = (app) => {
  // validate rules
  const loginRule = {
    username: 'string',
    password: 'string',
  };

  class LoginController extends app.Controller {
    async doLogin() {
      const { ctx } = this;
      ctx.validate(loginRule);

      let { username, password } = ctx.request.body;
      username = Decrypt(username);
      password = Decrypt(password);
      if (username && password) {
        const user = await this.service.user.find(username, password);
        if (user) {
          ctx.session.user = user;

          ctx.success('登陆成功');
        } else {
          ctx.error(401, '当前用户不存在！');
        }
      }
      ctx.status = 200;
    }

    async login() {
      await this.ctx.render('pages/login');
    }

    async logout() {
      const { ctx } = this;
      ctx.session.user = undefined;

      ctx.redirect(`/login${ctx.request.search}`);
    }
  }
  return LoginController;
};
