import React from 'react';
import renderer from 'react-test-renderer';

import { CensusPage } from '../../../Containers/CensusPage/index';

describe('Containers.CensusPage.index.test', () => {
  it('render correctly', () => {
    const tree = renderer
      .create(<CensusPage
        readData={() => {}} // mock function
        CensusPage={{
          readDataResult: {
            error: false,
            data: [
              {
                name: 'Jim',
                age: 30,
                gender: 'male',
                _id: 'b3Fshn8F976TZCTg',
              },
              {
                name: 'Bob',
                age: 20,
                gender: 'male',
                _id: 'oqnu2ZnPTebp04bG',
              },
            ],
          },
        }}
      />)
      .toJSON();
    console.log('tree: ', tree);
    expect(tree).toBeDefined();
    expect(tree).toMatchSnapshot();
  });
});
