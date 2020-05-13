from lost.pyapi import script
import os
import random

ENVS = ['lost']
ARGUMENTS = {
    'bbox': {'value': 'false',
             'help': 'If you see multiple plates on the image, you can draw a bounding box around the main one.'}
}


class RequestFiveClassesAnnos(script.Script):
    """
    Request annotations for each image of an imageset.
    An imageset is basically a folder with images.
    """

    def main(self):
        for ds in self.inp.datasources:
            media_path = ds.path
            annos = []
            anno_types = []
            lbls = []
            for annotask in self.outp.anno_tasks:
                possible_labels = annotask.possible_label_df['idx'].values.tolist()
            if self.get_arg('bbox').lower() == 'true':
                box = [0.6, 0.6, 0.1, 0.05]
                annos.append(box)
                anno_types.append('bbox')
                lbls.append(random.sample(possible_labels, 2))
            for img_file in os.listdir(media_path):
                img_path = os.path.join(media_path, img_file)
                self.outp.request_annos(img_path=img_path, annos=annos, anno_types=anno_types, anno_labels=lbls)
                self.logger.info('Requested annos for: {}'.format(img_path))


if __name__ == "__main__":
    my_script = RequestFiveClassesAnnos()
