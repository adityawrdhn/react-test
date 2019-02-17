import React from 'react';
import Users from './Users';
import 'raf/polyfill';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';

Enzyme.configure({ adapter: new Adapter() });

test('renders with minimum props without exploding', async () => {
  const match = { params: { id: '1', postId: '1' } };
  const wrapper = shallow(
    <Users match={match} />, { disableLifecycleMethods: true }
  );
  chai.expect(wrapper).to.have.length(1);
});
