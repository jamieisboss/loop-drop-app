module.exports = updateParamReferences

function updateParamReferences (node, oldId, newId) {
  var changed = false
  var result = JSON.stringify(node(), function (key, value) {
    if (value && value.node === 'linkParam' && value.param === oldId) {
      value = obtain(value)
      changed = true
      if (newId) {
        value.param = newId
      } else {
        return value.minValue
      }
    }
    return value
  })

  if (changed) {
    node.set(JSON.parse(result))
  }
}

function obtain (obj) {
  return JSON.parse(JSON.stringify(obj))
}
