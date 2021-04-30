const roleToRoute = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'Category',
  }],
};

export default function getMenuRouter(role, routes) {
  const allowRoutesName = roleToRoute[role].map((it) => it.name);
  const resultRoutes = routes.filter((r) => {
    if (allowRoutesName.indexOf(r.name) !== -1) {
      r.children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
