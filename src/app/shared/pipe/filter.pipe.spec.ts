import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform with undefined paramenters', () => {
    let result = pipe.transform(undefined, undefined, undefined);
    expect(result).toEqual([]);
  });

  it('transform with empty paramenters', () => {
    let result = pipe.transform([], '', []);
    expect(result).toEqual([]);
  });

  it('transform with string array items and empty searchText & searchFields', () => {
    let items = ['One', 'Two', 'Three'];

    let result = pipe.transform(items, '', []);
    expect(result).toEqual(items);
  });

  it('transform with valid items, searchText and searchFields', () => {
    let items = [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }];

    let result = pipe.transform(items, 'Two', ['name']);

    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(items[1]);
  });

  it('transform with valid items & searchFields, but different-case searchText', () => {
    let items = [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }];

    let result = pipe.transform(items, 'TwO', ['name']);

    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(items[1]);
  });

  it('transform with valid values but wrong case of searchField', () => {
    let items = [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }];

    let result = pipe.transform(items, 'Two', ['Name']);

    expect(result.length).toEqual(0);
  });

  it('transform with valid values but non-matching searchText', () => {
    let items = [{ name: 'One' }, { name: 'Two' }, { name: 'Three' }];

    let result = pipe.transform(items, 'Twoo', ['name']);

    expect(result.length).toEqual(0);
  });
});
