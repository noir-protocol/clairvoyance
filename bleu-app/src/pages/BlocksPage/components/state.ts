import {atom} from 'recoil';

export interface State {
  page_info: {
    page: number;
    count: number;
    total_page: number;
    total_count: number;
  },
  records: {
    optimism_tx_batches_id: number;
    batch_index: string;
    batch_timestamp: string;
    batch_size: string;
    l1_tx_hash: string;
    l1_block_number: string;
    batch_root: string;
    previous_total_elements: string;
    extra_data: string;
    submitter: string;
  }[];
}

export const options = atom({
  key: 'BlocksPageOptions',
  default: {
    numRows: 25,
    datetime: false,
  },
});

export const state = atom<State>({
  key: 'BlocksPageState',
  default: {} as State,
});