module.exports=
{
  "$schema": "http://json-schema.org/schema#",
  title: "Project",
  id: 'project',
  type: 'object',
  properties: {
    id: { type:'string' },
    name: { type:'string' },
    created: { type:'number' },
    time: { type:'number', default:0 }
  },
  required: [ 'id', 'name' ]
}
