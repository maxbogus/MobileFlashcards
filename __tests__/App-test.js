import 'react-native';
import React from 'react';
import App from '../App';
import renderer from 'react-test-renderer';

describe('App snapshot', () => {
    jest.useFakeTimers();

    it('renders the loading screen', async () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders the root without loading screen', async () => {
        const tree = renderer.create(<App skipLoadingScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
