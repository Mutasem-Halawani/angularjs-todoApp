function TodoService ($http) {
  var API = '//jsonplaceholder.typicode.com/todos/'

  function create (todo) {
    return $http.post(API, todo).then(function (res) {
      return res
    })
  }

  function retrieve () {
    return $http.get(API).then(function (res) {
      return res.data.splice(0, 10)
    })
  }

  function update (todo) {
    return $http.put(API + todo.id).then(function (res) {
      return res.data
    })
  }

  function remove (todo) {
    return $http.delete(API + todo.id).then(function (res) {
      return res.data
    })
  }

  return {
    create: create,
    retrieve: retrieve,
    update: update,
    remove: remove
  }
}

angular
  .module('app')
  .factory('TodoService', TodoService)
