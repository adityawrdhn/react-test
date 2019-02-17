import React from 'react';
import { get } from './common';
import 'raf/polyfill';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';

Enzyme.configure({ adapter: new Adapter() });
describe('API test (actions test)', () => {
  it('test get action', async () => {
    const check = (callback) => chai.expect(callback.id).to.equal(1);
    const getUser = await get('users/1', check)
  });
})