import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform undefined parameters into empty array', () => {
    let result = pipe.transform(undefined, undefined, undefined);
    expect(result).toEqual([]);
  });

  it('transform with empty paramenters', () => {
    let result = pipe.transform([], '', []);
    expect(result).toEqual([]);
  });

  it('should transform string array into itself when searchText & searchFields are empty', () => {
    let items = ['One', 'Two', 'Three'];

    let result = pipe.transform(items, '', []);
    expect(result).toEqual(items);
  });

  it('should transform object array into array with one item that matches searchText and searchFields', () => {
    let items = [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }];

    let result = pipe.transform(items, 'Two', ['name']);

    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(items[1]);
  });

  it('should transform object array into array with one item when searchText has different case and searchFields matches', () => {
    let items = [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }];

    let result = pipe.transform(items, 'TwO', ['name']);

    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(items[1]);
  });

  it('should transform object array into empty array when searchText matches but searchFields has wrong case', () => {
    let items = [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }];

    let result = pipe.transform(items, 'Two', ['Name']);

    expect(result.length).toEqual(0);
  });

  it('should transform object array into empty array when searchText does not match any element in array', () => {
    let items = [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }];

    let result = pipe.transform(items, 'Twoo', ['name']);

    expect(result.length).toEqual(0);
  });
});
