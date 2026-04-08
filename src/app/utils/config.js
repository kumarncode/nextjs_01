//uat
// const API_BASE_URL = {
//      EXPRESS_URL: 'https://ipms-uat.da.gov.in/node',
//  	TOMCAT_URL: 'https://ipms-uat.da.gov.in/ipms/api',
//  }
 //production
 const API_BASE_URL = {
     EXPRESS_URL: 'https://ipms.gov.in/node',
 	TOMCAT_URL: `${process.env.TOMCAT_URL}/api`,
 }
// const API_BASE_URL = {
//    TOMCAT_URL: 'http://localhost:3000/api',
//    EXPRESS_URL: 'http://localhost:5003/node',
// }

export default API_BASE_URL
