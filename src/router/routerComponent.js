class RouterComponent {
  Loading(resolve) {
    return require(["../views/Loading"], resolve);
  }

  Home(resolve) {
    return require(["../views/Home"], resolve);
  }

  My(resolve) {
    return require(["../views/My"], resolve);
  }

  Find(resolve) {
    return require(["../views/Find"], resolve);
  }

  Songs(resolve) {
    return require(["../views/Songs"], resolve);
  }

  Music(resolve) {
    return require(["../views/Music"], resolve);
  }

  List(resolve) {
    return require(["../views/List"], resolve);
  }

  Official(resolve) {
    return require(["../views/Official"], resolve);
  }

  Seach(resolve) {
    return require(["../views/Seach"], resolve);
  }
}
export default new RouterComponent();
