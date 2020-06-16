import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('transformWithEmptyParameters', () => {
    const pipe = new FilterPipe();

    let items = [];
    let searchText = '';
    let searchFields = [];

    let result = pipe.transform(items, searchText, searchFields);
    expect(pipe).toBeTruthy();
    expect(result).toEqual([]);
  });
});
