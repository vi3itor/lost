from flask import request
from flask_restplus import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from lost.api.api import api
from lost.api.sia.api_definition import sia_anno, sia_config, sia_update
from lost.api.label.api_definition import label_trees
from lost.db import roles, access
from lost.settings import LOST_CONFIG, DATA_URL
from lost.logic import sia
import json

namespace = api.namespace('siareview', description='SIA Review Annotation API.')


@namespace.route('/configuration/<int:annotask_id>')
@namespace.param('annotask_id', 'The id of the Annotation Task.')
class Configuration(Resource):
    @api.marshal_with(sia_config)
    @jwt_required 
    def get(self, annotask_id):
        dbm = access.DBMan(LOST_CONFIG)
        identity = get_jwt_identity()
        user = dbm.get_user_by_id(identity)
        if not user.has_role(roles.ANNOTATOR):
            dbm.close_session()
            return "You need to be {} in order to perform this request.".format(roles.ANNOTATOR), 401
        else:
            re = sia.get_configuration(dbm, identity, annotask_id)
            print ('Anno task config in endpoint', re)
            dbm.close_session()
            return re

################################################# TODO #############################################################
@namespace.route('/update')
class Update(Resource):
    @jwt_required 
    def post(self):
        dbm = access.DBMan(LOST_CONFIG)
        identity = get_jwt_identity()
        user = dbm.get_user_by_id(identity)
        if not user.has_role(roles.ANNOTATOR):
            dbm.close_session()
            return "You need to be {} in order to perform this request.".format(roles.ANNOTATOR), 401

        else:
            data = json.loads(request.data)
            re = sia.update(dbm, data, user.idx)
            dbm.close_session()
            return re


################################################# TODO #############################################################
@namespace.route('/anno/<int:anno_id>')
@namespace.param('anno_id', 'The id of the annotated image.')
class Anno(Resource):
    @api.marshal_with(sia_anno)
    @jwt_required 
    def get(self, anno_id):
        dbm = access.DBMan(LOST_CONFIG)
        identity = get_jwt_identity()
        user = dbm.get_user_by_id(identity)
        if not user.has_role(roles.ANNOTATOR):
            dbm.close_session()
            return "You need to be {} in order to perform this request.".format(roles.ANNOTATOR), 401

        else:
            anno_id = int(anno_id)
            re = sia.get_review_anno(dbm, identity, anno_id, DATA_URL)
            dbm.close_session()
            return re

################################################# TODO #############################################################
@namespace.route('/filteroptions/<int:annotask_id>')
@namespace.param('annotask_id', 'The id of the Annotation Task.')
class FilterOptions(Resource):
    @jwt_required 
    def get(self, annotask_id):
        dbm = access.DBMan(LOST_CONFIG)
        identity = get_jwt_identity()
        user = dbm.get_user_by_id(identity)
        if not user.has_role(roles.ANNOTATOR):
            dbm.close_session()
            return "You need to be {} in order to perform this request.".format(roles.ANNOTATOR), 401
        else:
            annotask_id = int(annotask_id)
            re = sia.get_filter_options(dbm, identity, annotask_id)
            dbm.close_session()
            return re

################################################# TODO #############################################################
@namespace.route('/filter')
class Filter(Resource):
    @jwt_required 
    def post(self):
        dbm = access.DBMan(LOST_CONFIG)
        identity = get_jwt_identity()
        user = dbm.get_user_by_id(identity)
        if not user.has_role(roles.ANNOTATOR):
            dbm.close_session()
            return "You need to be {} in order to perform this request.".format(roles.ANNOTATOR), 401
        else:
            data = json.loads(request.data)
            re = sia.get_filtered_annos(dbm, data, user.idx)
            dbm.close_session()
            return re