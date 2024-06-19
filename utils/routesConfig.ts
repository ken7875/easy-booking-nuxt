import type { NuxtPage } from 'nuxt/schema';

const splitPath = (path: string) => path.split('/').slice(1);

export const removePagesMatching = (pattern: RegExp, pages: NuxtPage[] = []) => {
  const pagesToRemove = [];
  for (const page of pages) {
    if (pattern.test(page.file as string)) {
      pagesToRemove.push(page);
    } else {
      removePagesMatching(pattern, page.children);
    }
  }
  for (const page of pagesToRemove) {
    pages.splice(pages.indexOf(page), 1);
  }
};

// const routeObjGetter = (pages: NuxtPage[] = []) => {
//   const routeObj: { [key: string]: NuxtPage } = {};
//   for (const page of pages) {
//     routeObj[page.name!] = page;
//   }

//   return routeObj;
// };

// export const setFatherPage = (pattern: RegExp, pages: NuxtPage[] = []) => {
//   const routeObj: { [key: string]: NuxtPage } = routeObjGetter(pages);
//   for (const page of pages) {
//     const pathAry = splitPath(page.path!);
//     if (pathAry.length < 2) {
//       continue;
//     }

//     for (let i = pathAry.length - 2; i >= 0; i--) {
//       // TODO 暫時只做單層嵌套路由處理，之後優化為多層嵌套
//       const fatherRoute = routeObj[pathAry[i]];
//       fatherRoute?.children?.push(page);
//       pages = pages.filter((page2) => page2.name !== page.name);
//     }
//   }

//   for (const page of pages) {
//     if (page.children?.length && page.children?.length > 0) {
//       page.redirect = page.children?.[0]?.path;
//     }
//   }
// };
