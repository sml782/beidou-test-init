module.exports = (app) => {
  class RoutesController extends app.Controller {
    async home() {
      this.ctx.redirect('/dashboard');
    }

    async show() {
      const ctx = this.ctx;
      // const www = await this.ctx.curl('http://blog.sgoldl.top/');
      // console.log(www.data.toString());
      // await this.ctx.render('https://www.baidu.com/');
      // ctx.status = www.status;
      // ctx.set(www.headers);
      // ctx.body = www.data.toString();
      await this.ctx.render('pages/dashboard');
      // this.ctx.redirect('http://blog.sgoldl.top/');
    }
  }
  return RoutesController;
};
