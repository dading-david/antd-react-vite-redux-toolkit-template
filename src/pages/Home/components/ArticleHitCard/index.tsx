import React, { useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';

import locales from '../../locales';

import { TableListItem } from './data.d';

import styles from '../../index.module.less';

import { PaginationConfig } from '../../data';

import { ResponseData } from '@/utils/request';
import { articleHitQueryList } from '../../service';
import { useAppSelector } from '@/stores';
// import { currentI18nSelector } from '@/stores/features/i18nSlice';
import { useTranslation } from "react-i18next";

const initPagination = {
  total: 0,
  current: 1,
  pageSize: 5,
  showSizeChanger: false,
};

const ArticleHitCard: React.FC = () => {
  // const t = useAppSelector(currentI18nSelector(locales));
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<TableListItem[]>([]);
  const [pagination, setPagination] = useState<PaginationConfig>({
    ...initPagination,
  });

  const getList = async (current: number) => {
    setLoading(true);
    try {
      const response: ResponseData<{ list: TableListItem[]; total: number }> = await articleHitQueryList({
        per: pagination.pageSize,
        page: current,
      });
      const { data } = response;
      setList(data?.list || []);
      setPagination({
        ...initPagination,
        current,
        total: data?.total || 0,
      });
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getList(1);
  }, []);

  const columns: ColumnsType<TableListItem> = [
    {
      title: t('page.home.articlehitcard.card.table-column-number'),
      dataIndex: 'index',
      width: 80,
      render: (_, record, index) => <>{(pagination.current - 1) * pagination.pageSize + index + 1}</>,
    },
    {
      title: t('page.home.articlehitcard.card.table-column-title'),
      dataIndex: 'title',
    },
    {
      title: t('page.home.articlehitcard.card.table-column-hit'),
      dataIndex: 'hit',
    },
  ];

  return (
    <Card className={styles.homeBoxCard} title={t('page.home.articlehitcard.card-title')}>
      <Table
        size='small'
        rowKey='id'
        columns={columns}
        dataSource={list}
        loading={loading}
        pagination={pagination}
        onChange={(p: TablePaginationConfig) => {
          getList(p.current || 1);
        }}
      />
    </Card>
  );
};

export default ArticleHitCard;
