/**
 * Easily strip the url apart:
 */

 const url = new URL('https://username:password@blog.theurl.com/homepage#section1?firstname=john&lastName=doe&age=22');

 const hostname = url.hostname;
 const host = url.host;
 const hash = url.hash;
 
 const pathname = url.pathname;
 const port = url.port;
 const protocol = url.protocol;
 const username = url.username;
 const password = url.password;

 const searchParams = url.searchParams;

