module.exports=
{
  "$schema": "http://json-schema.org/schema#",
  title: "Entry",
  id: 'entry',
  type: 'object',
  properties: {
    id: { type:'string' },
    projectId: { type:'string' },
    started: { type:'number' },
    duration: { type:'number' },
    created: { type:'number' }
  },
  required: [ 'id', 'projectId', 'duration' ]
}
