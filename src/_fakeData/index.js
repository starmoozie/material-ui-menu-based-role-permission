export const dashboardMenu = [
  {
    id: 1,
    name: "Dashboard",
    path: "/",
    permission: [],
    children: []
  }
];

export const menu = [
    {
      id: 2,
      name: "Master",
      path: "",
      permission: [],
      children: [
        {
          id: 3,
          name: "Table",
          path: "/table",
          permission: [
            {
              type: "action",
              children: [
                {
                  name: "Create",
                  action: {
                    method: "post"
                  },
                  columns: [
                    {
                      name: "name",
                      type: "Text"
                    }
                  ]
                }
              ]
            },
            {
              type: "filter",
              children: [
                {
                  name: "Filter",
                  action: {
                    method: "get"
                  },
                  columns: [
                    {
                      name: "name",
                      type: "Text"
                    }
                  ]
                }
              ]
            },
            {
              type: "line",
              children: [
                {
                  name: "Detail",
                  action: "",
                  columns: [
                    {
                      name: "name",
                      type: "Text"
                    }
                  ]
                },
                {
                  name: "Edit",
                  action: {
                    method: "put"
                  },
                  columns: [
                    {
                      name: "name",
                      type: "Text"
                    }
                  ]
                }
              ]
            },
            {
              type: "bulk",
              children: [
                {
                  name: "Delete",
                  action: {
                    method: "delete"
                  },
                  columns: []
                },
                {
                  name: "Download",
                  action: {
                    method: "get"
                  },
                  columns: []
                }
              ]
            },
            {
              type: "option",
              children: [
                {
                  name: "Upload",
                  action: {
                    method: "post"
                  },
                  columns: []
                }
              ]
            }
          ]
        }
      ]
    }
  ];
  
  export const publicMenu = [
    {
      id: "1",
      name: "login",
      dir: "auth/Login",
      path: "/login"
    },
    {
      id: "2",
      name: "register",
      dir: "auth/Register",
      path: "/register"
    }
  ];
  