import { SnippetsOutlined } from '@ant-design/icons';
export default [
  {
    children: [],
    icon: <SnippetsOutlined />,
    name: '首页',
    code: '000',
    url: '/',
  },
  {
    icon: <SnippetsOutlined />,
    name: '人才管理',
    code: '001',
    url: '/personnel',
  },
  {
    icon: <SnippetsOutlined />,
    name: '职位管理',
    code: '002',
    url: '/position',
  },
  {
    icon: <SnippetsOutlined />,
    name: '统计管理',
    code: '003',
    url: '/statistics',
  },
  {
    icon: <SnippetsOutlined />,
    name: '系统管理',
    code: '004',
    url: '/system',
    children: [
      {
        name: '菜单管理',
        code: '005',
        url: '/system/menu',
      },
      {
        name: '用户管理',
        code: '006',
        url: '/system/user',
      },
    ],
  },
];
