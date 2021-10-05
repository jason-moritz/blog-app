const compareKey = (key) => (a, b) => {
  if (a[key] < b[key]) {
    return -1;
  }
  if (a[key] > b[key]) {
    return 1;
  }
  return 0;
};

// one liner
// const compareKey = key => (a, b) => a[key] == b[key]? (a[key] < b[key] ? -1 : 1) : 0

export const TitleAZ = (arr) => arr.sort(compareKey("title"));
export const TitleZA = (arr) => arr.sort(compareKey("title")).reverse();
export const AuthorAZ = (arr) => arr.sort(compareKey("author"));
export const AuthorAZ = (arr) => arr.sort(compareKey("author")).reverse();
