export const isPropInModule = (module, prop) => {
  return Object.getOwnPropertyNames(module.__proto__).includes(prop);
};
