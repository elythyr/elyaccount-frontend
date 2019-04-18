"use strict";

const resourcesUri = {
  clients: '/clients',
}

export const apiUrls = Object.keys(resourcesUri).reduce((newRoutes, name) => ({
  ...newRoutes,
  [name]: API_URL + resourcesUri[name],
}), {});
