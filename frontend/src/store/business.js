const LOAD = "businesses/LOAD";
const ADD_ONE = "businesses/ADD_ONE";
const LOAD_TYPES = "businesses/LOAD_TYPES"
const DELETE_ONE = "businesses/DELETE_ONE";
const SELECT_BUSINESS = "businesses/SELECT_BUSINESS";
const EDIT_ONE = "businesses/EDIT_ONE"
// const GET_ONE = "businesses/GET_ONE"

const load = (list) => ({
  type: LOAD,
  list,
});

const loadTypes = (types) => ({
    type: LOAD_TYPES,
    types,
  });

const editOne = (list) => ({
  type: EDIT_ONE,
  list,
});

const addOne = (business) => ({
  type: ADD_ONE,
  business,
});

const deleteOne = businessId => ({
    type: DELETE_ONE,
    businessId,
})

const selectBusiness = business => ({
    type: SELECT_BUSINESS,
    business,
});

// const getOne = (business) => ({
//     type: GET_ONE,
//     business
// })

// export const getOnePokemon = id => async dispatch => {
//     const response = await fetch (`/api/business/${id}`);

//     if (response.ok) {
//         const business = await response.json();
//         dispatch(getOne(business));
//     }
// }

export const deleteBusiness = id => async (dispatch) => {
    const response = await fetch(`/api/business/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
      const id = await response.json();
      dispatch(deleteOne(id));
      return id;
    }
}


export const getBusinesses = () => async (dispatch) => {
  const response = await fetch(`/api/business`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list;
  }
};

export const getBusinessTypes = (business) => async (dispatch) => {
    const response = await fetch(`/api/type`)
    if (response.ok) {
        const types = await response.json();
        dispatch(loadTypes(types));
        return types;
    }
}

// export const chooseBusiness = id => async dispatch => {
//     const response = await fetch(`/api/songs/${id}`)
//     if (response.ok) {
//         const business = await response.json();
//         dispatch(selectBusiness(business));
//         return business
//     }
// }
export const chooseBusiness = business => async dispatch => {
            dispatch(selectBusiness(business));
    }
export const editBusiness = (business) => async (dispatch) => {
    const response = await fetch(`/api/business/edit`);
    dispatch(editOne(business));
    return business;
}

export const createBusiness = (business) => async (dispatch) => {
  const response = await fetch(`/api/business/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(business),
  });
  if (response.ok) {
    const business = await response.json();
    dispatch(addOne(business));
    return business;
  }
};

const initialState = {
  list: [],
  types: [],
  selectedBusiness: '',
};

const businessReducer = (state = initialState, action) => {
    let fixedState;
  switch (action.type) {
    case LOAD:
      const allBusinesses = {};
      action.list.forEach((business) => {
        allBusinesses[business.id] = business;
      });

      return {
        ...state,
        list: action.list,
      };
    case LOAD_TYPES:
      return {
        ...state,
        types: action.types,
      };
    case DELETE_ONE:
      delete state.business[action.businessId];
      return state;
    case ADD_ONE:
      const newState = {...state}
      return {
        ...state,
        business: {
          ...state.business,
          newBusiness: action.business,
        },
      };
    case SELECT_BUSINESS:
      return {
          ...state,
          currentBusiness: action.business,
      };
    default:
      return state;
  }
};

export default businessReducer;
