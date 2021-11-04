import React from 'react';
import {
  Link,
} from '@mui/material';
import {l1Explorer} from '../utils/urlResolver';

export function L1AddressLink(props: any) {
  return (
    <Link variant='mono' underline='none' noWrap={true} href={l1Explorer('/address/', props.address)} sx={props.sx}>
      {props.address}
    </Link>
  );
}

export function L2AddressLink(props: any) {
  return (
    <Link variant='mono' underline='none' noWrap={true} href={`/account/${props.address}`} sx={props.sx}>
      {props.address}
    </Link>
  );
}

export function L1TransactionLink(props: any) {
  return (
    <Link variant='mono' underline='none' noWrap={true} href={l1Explorer('/tx', props.hash)} target='_blank' rel='noreferrer' sx={props.sx}>
      {props.hash}
    </Link>
  );
}

export function L2TransactionLink(props: any) {
  return (
    <Link variant='mono' underline='none' noWrap={true} href={`/tx/${props.hash}`} sx={props.sx}>
      {props.hash}
    </Link>
  );
}

export function L1BlockLink(props: any) {
  return (
    <Link variant='mono' underline='none' noWrap={true} href={l1Explorer('/block', props.blockNumber)} target='_blank' rel='noreferrer' sx={props.sx}>
      {props.blockNumber}
    </Link>
  );
}

export function L2BlockLink(props: any) {
  return (
    <Link variant='mono' underline='none' noWrap={true} href={`/block/${props.blockNumber}`} sx={props.sx}>
      {props.blockNumber}
    </Link>
  );
}
