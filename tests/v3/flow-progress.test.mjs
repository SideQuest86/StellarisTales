import test from 'node:test';
import assert from 'node:assert/strict';
import {flowProgress,flowTargets,flowEdges} from '../src/story-flow.js';

test('staged stories preserve explicit resolved cross-dossier follow-ups',()=>{
  const flow={positions:{a:{stage:0,lane:0,step:0}},stages:[{mode:'sequence',lanes:[['a']]}]};
  const external={target:'over.50',story:'cache',conditional:true};
  assert.deepEqual(flowEdges(flow,'a',[external,{target:'unresolved'}],new Set()),[external]);
  assert.deepEqual(flowTargets(flow,'a',new Set()),[]);
});

test('indexed graph routes re-evaluate history after backtracking and edge replacement',()=>{
  const flow={positions:{a:{stage:0}},stages:[{mode:'graph'}],edges:[{from:'a',to:'b',requiresVisited:['decision']},{from:'a',to:'c'}]};
  assert.deepEqual(flowTargets(flow,'a',new Set()),['c']);
  assert.deepEqual(flowTargets(flow,'a',new Set(['decision'])),['b','c']);
  assert.deepEqual(flowTargets(flow,'a',new Set()),['c']);
  flow.edges=[{from:'a',to:'d'}];
  assert.deepEqual(flowTargets(flow,'a',new Set()),['d']);
});

test('reading one graph node does not mark the whole graph as read',()=>{
  const flow={stages:[{mode:'graph',lanes:[['a'],['b'],['c']]}]};
  assert.deepEqual(flowProgress(flow,new Set(['a'])),[{completed:1,required:3}]);
});
test('parallel progress counts reports, while alternative outcomes require only one result',()=>{
  const flow={stages:[{mode:'parallel',required:2,lanes:[['a','a-report'],['b','b-report'],['c','c-report']]},{mode:'alternative',lanes:[['first'],['late']]}]};
  assert.deepEqual(flowProgress(flow,new Set(['a','b','a-report','first'])),[{completed:1,required:2},{completed:1,required:1}]);
});
