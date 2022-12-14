import React from 'react';
import {Link,} from '@mui/material';

export function BlockLink(props: any) {
  return (
    <Link variant='mono' underline='none' noWrap={true} href={`/block/height/${props.height}`} target='_blank'
          rel='noreferrer' sx={props.sx}>
      {props.height}
    </Link>
  );
}

export function TxLink(props: any) {
  return (
    <Link variant='mono' underline='none' noWrap={true} href={`/tx/hash/${props.hash}`} target='_blank' rel='noreferrer'
          sx={props.sx}>
      {props.hash}
    </Link>
  );
}

export function TxsLink(props: any) {
  return (
    <Link variant='mono' underline='none' noWrap={true} href={`/txs/height/${props.height}`} target='_blank'
          rel='noreferrer' sx={props.sx}>
      {props.num_txs}
    </Link>
  );
}

export function ProposalLink(props: any) {
  return (
    <Link variant='mono' underline='none' noWrap={true} href={`/proposal/id/${props.id}`} target='_blank'
          rel='noreferrer' sx={props.sx}>
      {props.title}
    </Link>
  );
}

export function ValidatorLink(props: any) {
  return (
    <Link variant='mono' underline='none' noWrap={true} href={`/validator/address/${props.address}`} target='_blank'
          rel='noreferrer' sx={props.sx}>
      {props.address}
    </Link>
  );
}
