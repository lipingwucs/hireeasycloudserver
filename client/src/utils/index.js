/*
A module containing utility functions
 */


export function getRedirectTo(type, avatar) {
  let path
  // type
  if(type==='jobPoster') {
    path = '/jobPoster'
  } else {
    path = '/jobSeeker'
  }
  // avatar
  if(!avatar) { // No value, return information to complete the path of the interface
    path += 'info'
  }

  return path
}