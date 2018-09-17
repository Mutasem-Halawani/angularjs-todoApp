function TodoController (TodoService) {
  var ctrl = this
  ctrl.newTodo = ''
  ctrl.list = []
  ctrl.getTodos = (function () {
    TodoService
      .retrieve()
      .then(function (res) {
        ctrl.list = res
      })
  })()

  ctrl.updateTodo = function (item, index) {
    if (!item.title) {
      ctrl.removeTodo(item, index)
      return
    }
    TodoService.update(item)
  }

  ctrl.addTodo = function () {
    if (!ctrl.newTodo) {
      return
    }
    TodoService.create({
      title: ctrl.newTodo,
      completed: false
    }).then(function (res) {
      ctrl.list.unshift(res.data)
      ctrl.newTodo = ''
    })
  }

  ctrl.removeTodo = function (item, index) {
    TodoService.remove(item).then(function (res) {
      ctrl.list.splice(index, 1)
    })
  }

  ctrl.getRemaining = function () {
    return ctrl.list.filter(function (item) {
      return !item.completed
    })
  }

  ctrl.toggleState = function (item) {
    TodoService
      .update(item)
      .then(function () {

      }, function () {
        item.completed = !item.completed
      })
  }
}

angular
  .module('app')
  .controller('TodoController', TodoController)
